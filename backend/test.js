const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
	auth: "secret_9yUOPgu5Pq3CtlaLeVgrezzchOviUgdLNDagAKBptrp",
})

const getUsers = async () => {
	const listUsersResponse = await notion.users.list({})
    console.log(listUsersResponse)
}

getUsers()