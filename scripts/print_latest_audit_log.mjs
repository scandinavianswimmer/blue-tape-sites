import mysql from "mysql2/promise";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    const [rows] = await connection.execute(
      `select timestamp, name, company, email, serviceArea, status, resendMessageId
       from auditSubmissionLogs
       order by id desc
       limit 1`
    );

    console.log(JSON.stringify(Array.isArray(rows) ? rows[0] ?? null : null, null, 2));
  } finally {
    await connection.end();
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
