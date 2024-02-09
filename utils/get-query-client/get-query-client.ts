import { QueryClient } from "@tanstack/react-query";

const Client = {
	client: new QueryClient(),
};

Object.freeze(Client);

export const getQueryClient = () => Client.client;
