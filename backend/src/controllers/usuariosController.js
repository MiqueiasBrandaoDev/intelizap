import { query } from '../config/database.js';

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await query(
      `SELECT id, nome, email, instancia, plano_ativo, max_grupos, tokens_mes, \`dia-renovacao-tokens\`,
              horaResumo, resumoDiaAnterior, transcricao_ativa, \`transcricao-pvd\`, 
              transcreverEu, ambiente, \`key-openai\`, ludico, agendamento, criado_em 
       FROM usuarios 
       WHERE id = ?`,
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Campos permitidos para atualização
    const allowedFields = [
      'nome', 'email', 'plano_ativo', 'horaResumo', 'resumoDiaAnterior',
      'transcricao_ativa', 'transcricao-pvd', 'transcreverEu', 'ambiente',
      'key-openai', 'ludico', 'agendamento'
    ];

    // Filtrar apenas campos permitidos
    const fieldsToUpdate = {};
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        fieldsToUpdate[key] = updateData[key];
      }
    });

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo válido para atualização'
      });
    }

    // Verificar se usuário existe
    const existingUsers = await query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Construir query de update
    const setClause = Object.keys(fieldsToUpdate)
      .map(key => key.includes('-') ? `\`${key}\` = ?` : `${key} = ?`)
      .join(', ');
    
    const values = Object.values(fieldsToUpdate);
    values.push(id);

    await query(`UPDATE usuarios SET ${setClause} WHERE id = ?`, values);

    // Buscar usuário atualizado
    const updatedUsers = await query(
      `SELECT id, nome, email, instancia, plano_ativo, horaResumo, 
              resumoDiaAnterior, transcricao_ativa, \`transcricao-pvd\`, 
              transcreverEu, ambiente, \`key-openai\`, ludico, agendamento, criado_em 
       FROM usuarios 
       WHERE id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: updatedUsers[0]
    });

  } catch (error) {
    console.error('❌ Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'A nova senha deve ter pelo menos 6 caracteres'
      });
    }

    // Buscar usuário atual
    const users = await query(
      'SELECT senha FROM usuarios WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const user = users[0];

    // Verificar senha atual (sem hash por enquanto)
    if (currentPassword !== user.senha) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }

    // Atualizar senha
    await query(
      'UPDATE usuarios SET senha = ? WHERE id = ?',
      [newPassword, id]
    );

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se usuário existe
    const existingUsers = await query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (existingUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Deletar usuário (CASCADE vai deletar grupos e mensagens relacionadas)
    await query('DELETE FROM usuarios WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });

  } catch (error) {
    console.error('❌ Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};