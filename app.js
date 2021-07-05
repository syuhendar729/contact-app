/* ==== Memembuat Contact App ==== */

const yargs		= require('yargs')
const {pertanyaan, simpanContact, listContact, detailContact, deleteContact} = require('./contact')
/* -- buat function utama utk menjalankan function pertanyaan sebelumnya -- */
/* - konsep async await -- */
const main = async () => {
	const nama 	= await pertanyaan('Masukkan nama : ')
	const email = await pertanyaan('Masukkan email : ')
	const notelp = await pertanyaan('Masukkan nomor : ')
	simpanContact(nama, email, notelp)
}


/* -- Mengambil Argument dr Command Line -- */

/* -- Dgn manual -- */
// const cmd = process.argv
// console.log(cmd)
// if (cmd === "add")
// else if (cmd === "remove")
// else if (cmd === "list")

/* -- Dgn yargs -- */
// console.log(yargs.argv)
// yargs.command(command, desc, builder, handler)
// yargs.command('add', 'Menambahkan konta baru', () => {}, (arg) => console.log(arg.nama))

// -- command menambahkan kontak dgn parameter --
yargs.command({
	command: 'add',
	describe: 'Menambahkan kontak baru dengan parameter',
	builder: {
		nama: {
			describe: 'Nama lengkap',
			demandOption: true,
			type: 'string'
		},
		email: {
			describe: 'Alamat email',
			demandOption: false,
			type: 'string'
		},
		notelp: {
			describe: 'Nomor telpon',
			demandOption: true,
			type: 'string'
		}
	},
	handler: (arg) => {
		const contact = {
			nama: arg.nama,
			email: arg.email,
			notelp: arg.notelp
		}
		console.log(`Kontak baru : `, contact)
		simpanContact(arg.nama, arg.email, arg.notelp)
	}
})
	.demandCommand()

// -- command menambahkan kontak dgn inputan --
yargs.command('input', 'Menambah kontak baru dengan inputan', () => {}, () => main())

// -- menampilkan nama kontak --
yargs.command({
	command: 'list',
	describe: 'Menampilkan semua nama kontak',
	handler: () => listContact()
})

// -- menampilkan detail kontak berdasarkan nama --
yargs.command({
	command: 'detail',
	describe: 'Menampilkan detail kontak berdasarkan nama',
	builder: {
		nama: {
			describe: 'Nama kontak',
			demandOption: true,
			type: 'string'
		}
	},
	handler: arg => detailContact(arg.nama)
})

// -- delete contact --
yargs.command({
	command: 'delete',
	describe: 'Menghapus kontak berdasarkan nama',
	builder: {
		nama: {
			describe: 'Nama kontak',
			demandOption: true,
			type: 'string'
		}
	},
	handler: arg => deleteContact(arg.nama)
})

yargs.parse()

