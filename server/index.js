const express = require('express'),
	  app = express();

app.use(express.static(`${__dirname}/../build`));

const PORT = 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

