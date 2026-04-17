import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  const [rows] = await connection.execute(
    `SELECT postSlug, postCategory, ctaLabel, ctaPlacement, destinationPath, sourcePath
     FROM blogCtaClicks
     ORDER BY id DESC
     LIMIT 1`
  );

  const [latest] = rows;

  if (!latest) {
    console.log(JSON.stringify({ found: false }));
    process.exit(0);
  }

  console.log(JSON.stringify({ found: true, latest }));
} finally {
  await connection.end();
}
