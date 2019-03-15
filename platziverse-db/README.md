# platziverse-db

## Usage


const setupDatabase = requires ('platziverse-db')

setupDatabase(config).then(db =>{
	const {Ange, Metric} = db
}).catch(err => console.log(err))