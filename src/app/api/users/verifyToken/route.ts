import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa';

const client = jwksClient({
	jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

function getKey(header, callback) {
	client.getSigningKey(header.kid, (err, key) => {
		if (err) return callback(err);
		const signingKey = key.getPublicKey();
		callback(null, signingKey);
	});
}

export async function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			getKey,
			{
				audience: process.env.AUTH0_AUDIENCE,
				issuer: `https://${process.env.AUTH0_DOMAIN}/`,
				algorithms: ['RS256']
			},
			(err, decoded) => {
				if (err) return reject(err);
				resolve(decoded);    // decoded is your token payload
			}
		);
	});
}
