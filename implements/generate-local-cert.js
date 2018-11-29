require('./config');
const fs = require('fs');
const cmd = require('node-cmd');

if (!fs.existsSync(global.boil.certificationDir)) {
  fs.mkdirSync(global.boil.certificationDir);
}

// cmd.run(
//   `openssl genrsa -des3 -out ${global.boil.certificationDir}/rootSSL.key 2048`,
// );

// cmd.run(
//   `openssl req -x509 -new -nodes -key ${
//     global.boil.certificationDir
//   }/rootSSL.key -sha256 -days 1024 -out ${
//     global.boil.certificationDir
//   }/rootSSL.pem -subj "/C=IN/ST=State/L=City/O=Organization/OU=OrganizationUnit/CN=boil/emailAddress=boil@example.com"`,
// );

// cmd.run(
//   `openssl req -new -sha256 -nodes -out  ${
//     global.boil.certificationDir
//   }/server.csr -newkey rsa:2048 -keyout ${
//     global.boil.certificationDir
//   }/server.key -subj "/C=IN/ST=State/L=City/O=Organization/OU=OrganizationUnit/CN=boil/emailAddress=boil@example.com"`,
// );

// cmd.run(`
//   openssl req -x509 -in cert/server.csr -CA cert/rootSSL.pem -CAkey cert/rootSSL.key -CAcreateserial -out cert/server.crt -days 500 -sha256 -extfile <(echo " authorityKeyIdentifier=keyid,issuer\n basicConstraints=CA:FALSE\n keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment\n subjectAltName=DNS:l.boil.io")
// `);
