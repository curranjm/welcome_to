const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// create a file to stream archive data to.
const output = fs.createWriteStream(path.join(__dirname, 'lambda.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', () => {
  console.log('Data has been drained');
});

// good practice to catch this error explicitly
archive.on('error', (err) => {
  throw err;
});

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(path.join(__dirname, '/src'), false);
archive.directory(path.join(__dirname, '/build/node_modules'), false);

// pipe archive data to the file
archive.pipe(output);

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register
// to them beforehand
archive.finalize();
