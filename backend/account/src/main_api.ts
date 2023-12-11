import CreatePassenger from "./application/usecase/CreatePassenger";
import CreateDriver from "./application/usecase/CreateDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import GetDriver from "./application/usecase/GetDriver";
import DriverRepositoryDatabase from "./infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import UsecaseFactory from "./application/factory/UsecaseFactory";
import Registry from "./infra/di/Registry";
import UserRepositoryDatabase from "./infra/repository/UserRepositoryDatabase";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueController from "./infra/queue/QueueController";

// main composition root
async function main () {
	const connection = new PgPromiseAdapter();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const passengerRepository = new PassengerRepositoryDatabase(connection);
	const driverRepository = new DriverRepositoryDatabase(connection);
	const userRepository = new UserRepositoryDatabase(connection);
	const createPassenger = new CreatePassenger(passengerRepository, userRepository);
	const httpServer = new ExpressAdapter();
	const repositoryFactory = new RepositoryFactoryDatabase(connection);
	const usecaseFactory = new UsecaseFactory(repositoryFactory);
	const registry = Registry.getInstance();
	registry.provide("createPassenger", createPassenger);
	new MainController(httpServer, usecaseFactory, queue);
	new QueueController(queue);
	httpServer.listen(3002);
}

main();