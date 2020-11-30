const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const tmp = file.originalname.split('.');
		cb(null, `img${Date.now()}.${tmp[tmp.length - 1]}`);
	},
});
const upload = multer({ storage });

const PORT = 5000;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notesSchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String, required: true },
	image: { type: String, required: false },
	date: { type: Date, default: Date.now },
});
const Notes = mongoose.model('Note', notesSchema);

app.use(bodyParser.json());

mongoose.connect(
	'mongodb://localhost:27017/notes',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.log(err);
		app.listen(PORT, () => {
			console.log('Server is ready...');
		});
	}
);

app.get('/api/notes/pages', (req, res) => {
	Notes.countDocuments({}, (err, count) => {
		res.json({ count });
	});
});

app.get('/api/notes/:page', (req, res) => {
	Notes.find({})
		.sort({ date: -1 })
		.skip(5 * req.params.page)
		.limit(5)
		.exec((err, data) => (err ? res.status(400) : res.json(data)));
});

app.post('/api/notes/add', upload.single('image'), (req, res) => {
	const note = new Notes({ ...req.body, image: req.file.filename });
	note.save();
	return res.status(201).json(note);
});

app.get('/api/image/:name', (req, res) =>
	fs.existsSync(`./uploads/${req.params.name}`)
		? res.sendFile(path.join(__dirname, `./uploads/${req.params.name}`))
		: res.status(404).send({ msg: 'There in no such image...' })
);

app.delete('/api/notes/:page/:id', (req, res) => {
	Notes.findOne({ _id: req.params.id }, (err, { image }) => {
		if (image && fs.existsSync(`./uploads/${image}`))
			fs.unlink(`./uploads/${image}`, (err) => console.log(err));
	});
	Notes.deleteOne({ _id: req.params.id }, (err) => {
		if (err) return res.status(400).json();
		Notes.find({})
			.sort({ date: -1 })
			.skip(5 * req.params.page)
			.limit(5)
			.exec((err, data) => (err ? res.status(400) : res.json(data)));
	});
});
