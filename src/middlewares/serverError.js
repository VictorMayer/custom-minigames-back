export default async function serverError(err, req, res) {
    // eslint-disable-next-line no-console
    console.log('Middleware de erro: ', err);

    return res.sendStatus(500);
}
