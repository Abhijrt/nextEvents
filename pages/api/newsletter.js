import { connectDataBase, insertDocument } from "../../helpers/db-utils";

export default async function handler (req, res) {
    if(req.method === 'POST') {
        const email = req.body.email;
        if(!email || !email.includes('@')) {
            res.status(422).json({
                message: "Not a valid Email !"
            })
        }

        let client; 
        try {
            client = await connectDataBase();
        }catch(err) {
            res.status(500).json({
                message: 'Not Connected to the Database !',
                error: err
            });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', {email : email});
            client.close(); 
        }catch(err) {
            res.status(500).json({
                message: 'Not Inserted the document'
            });
            return;
        }
        res.status(201).json({ message: 'Signed up!' });
    }
}