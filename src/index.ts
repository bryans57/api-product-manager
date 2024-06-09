import server from './server';
import colors from 'colors';
import { ENV } from './utils';

server.listen(ENV.PORT, () => {
	console.info(
		colors.cyan.bold(`Server is running on http://localhost:${ENV.PORT}`)
	);
});
