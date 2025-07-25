import mysql from 'mysql2/promise';

async function dropTable() {
  try {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root', 
      password: '',
      database: 'intellizap'
    });
    
    await pool.execute('DROP TABLE IF EXISTS resumos');
    console.log('✅ Tabela resumos removida com sucesso');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

dropTable();