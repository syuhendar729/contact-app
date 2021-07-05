const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')
const readline = require('readline');
const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout

});

// -- buat folder data jika blm ada --
const folderData = './data'
if (!fs.existsSync(folderData)) {
	fs.mkdirSync(folderData)
}
// -- buat contact.json jika blm ada --
const fileKontak = './data/contacts.json'
if (!fs.existsSync(fileKontak)) {
	fs.writeFileSync(fileKontak, '[]', 'utf8')
}

// -- buat pertanyaan dgn function terpisah dan mengembalikan promise --
const pertanyaan = (ask) => {
	return new Promise( (resolve, reject) => {
		rl.question(ask, (jawaban) => {
			resolve(jawaban)
		})
	})
}

const loadContact = () => {
	const file	 	= fs.readFileSync('data/contacts.json', 'utf8')
	const contacts 	= JSON.parse(file)
	return contacts
}

const simpanContact = (nama, email, notelp) => {
	const contact 	= { nama, email, notelp }
	const contacts	= loadContact()
	 /* -- cek duplikat dan validasi -- */
	// -- nama --
	const duplNama	= contacts.find(con => con.nama === nama)
	if (duplNama) {
		console.log(chalk.bgRedBright.black('Nama ini sudah terdaftar!'))
		rl.close()
		return false
	}
	// -- email --
	const duplEmail = contacts.find(con => con.email === email)
	if (email) {
		if (!validator.isEmail(email)) {
			console.log(chalk.bgRedBright.black('Email tidak valid!'))
			rl.close()
			return false
		} else if (duplEmail) {
			console.log(chalk.bgRedBright.black('Email ini sudah terdaftar!'))
			rl.close()
			return false
		}
	}
	// -- no telp --
	const duplNotelp = contacts.find(con => con.notelp === notelp)
	if (!validator.isMobilePhone(notelp, 'id-ID')) {
		console.log(chalk.bgRedBright.black('Nomor ini tidak valid!'))
		rl.close()
		return false
	} else if (duplNotelp) {
		console.log(chalk.bgRedBright.black('Nomor ini sudah terdaftar!'))
		rl.close()
		return false
	}

	contacts.push(contact)
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
	console.log(chalk.bgGreenBright.black('Data kontak berhasil disimpan : \n'), contacts)
	rl.close();
}

const listContact = () => {
	const contacts = loadContact()
	console.log(chalk.bgGreenBright.black('Daftar kontak :'))
	contacts.forEach((con, i) => console.log(chalk`${i + 1}. {greenBright ${con.nama}} - {blueBright ${con.notelp}}`))
	rl.close()
}

const detailContact = (nama) => {
	const contacts	= loadContact()
	const contact 	= contacts.find(con => con.nama.toLowerCase() === nama.toLowerCase())

	if (!contact) {
		console.log(chalk.bgRedBright.black(chalk`Nama {bgYellow ${nama}} tidak ditemukan!`))
		rl.close()
		return false
	}
	
	console.log(chalk.bgGreenBright.black('Detail kontak : '))
	console.log(chalk`{blue Nama} : {yellow ${contact.nama}}\n{blue Email} : {yellow ${contact.email}}\n{blue Nomor} : {yellow ${contact.notelp}}`)
	rl.close()

}

const deleteContact = (nama) => {
	const contacts 	  = loadContact()
	const newContacts = contacts.filter(con => con.nama.toLowerCase() !== nama.toLowerCase())

	if (contacts.length === newContacts.length) {
		console.log(chalk.bgRedBright.black(chalk`Nama {bgYellow ${nama}} tidak ditemukan!`))
		rl.close()
		return false
	}
	
	fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
	console.log(chalk.bgGreen.black(chalk`Data kontak {bgYellow ${nama}} berhasil dihapus!`))
	console.log(chalk.bgGreen(`Data kontak : \n`), newContacts)
	rl.close()
}

module.exports = {pertanyaan, simpanContact, listContact, detailContact, deleteContact}
