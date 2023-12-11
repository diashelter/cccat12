import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
};

test("Deve cadastrar o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const response1 = await axios.post("http://localhost:3002/passengers", input);
	const output1 = response1.data;
	expect(output1.passengerId).toBeDefined();
});

test("Deve cadastrar o passageiro async", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	await axios.post("http://localhost:3002/passengersAsync", input);
});

test("Não deve cadastrar o passageiro com cpf inválido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616076"
	};
	const response = await axios.post("http://localhost:3002/passengers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid cpf");
});

test("Deve obter o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074"
	};
	const response1 = await axios.post("http://localhost:3002/passengers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3002/passengers/${output1.passengerId}`);
	const output2 = response2.data;
	expect(output2.name).toBe("John Doe");
	expect(output2.email).toBe("john.doe@gmail.com");
	expect(output2.document).toBe("83432616074");
});

test("Deve cadastrar o motorista", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const response1 = await axios.post("http://localhost:3002/drivers", input);
	const output1 = response1.data;
	expect(output1.driverId).toBeDefined();
});

test("Não deve cadastrar o motorista com cpf inválido", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616076",
		carPlate: "AAA9999"
	};
	const response = await axios.post("http://localhost:3002/drivers", input);
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output).toBe("Invalid cpf");
});

test("Deve obter o motorista", async function () {
	const input = {
		name: "John Doe",
		email: "john.doe@gmail.com",
		document: "83432616074",
		carPlate: "AAA9999"
	};
	const response1 = await axios.post("http://localhost:3002/drivers", input);
	const output1 = response1.data;
	const response2 = await axios.get(`http://localhost:3002/drivers/${output1.driverId}`);
	const output2 = response2.data;
	expect(output2.name).toBe("John Doe");
	expect(output2.email).toBe("john.doe@gmail.com");
	expect(output2.document).toBe("83432616074");
	expect(output2.carPlate).toBe("AAA9999");
});