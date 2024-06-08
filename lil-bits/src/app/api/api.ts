import { DrinksResponse } from "../types/types";
import { MealsResponse, OrderType } from "../types/types";

// This is where we contact the server and other api's

// getOrders connects to the server, and if something goes wrong, we get the error
const getOrders = async (email: string): Promise<OrderType> => {
  const res = await fetch(`http://localhost:3001/api/order/${email}`)

  // This error is what comes if the server doesn't respond
  if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
  // If the server response is anything but success, we set the error to the response error
  const response = await res.json()
  if (response.success === false){
    throw new Error(response.error)
  }
  return response
}

// This function is for sending orders to the server
const postOrder = async (order: OrderType): Promise<OrderType> => {
  const res = await fetch('http://localhost:3001/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
  // This error is what comes if the server doesn't respond

  if (!res.ok) {
    throw new Error('Failed to post data')
  }

  // If the server response is anything but success, we set the error to the response error
  const response = await res.json()
  if (response.success === false){
    throw new Error(response.error)
  }
  
  return response
}

// This is for updating an order on the server
const putOrder = async (order: OrderType): Promise<OrderType> => {
  const res = await fetch('http://localhost:3001/api/update-order', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order),
  })

  // This error is what comes if the server doesn't respond
  if (!res.ok) {
    throw new Error("Failed to update data");
  }
  
  // If the server response is anything but success, we set the error to the response error
  const response = await res.json()
  if (response.success === false){
    throw new Error(response.error)
  }
  return response
}

// This function is for getting a random dish from themealdb.com
const getRandomOrder = async (): Promise<MealsResponse> => {
  const res = await fetch('https://themealdb.com/api/json/v1/1/random.php')

  // This error is what comes if the server doesn't respond
  if (!res.ok) {
		throw new Error("Failed to fetch data");    
  }

  // Since we always want an object, if the server responds with anything else, we get an error
  // This might be bad code, I am not sure
  const response = await res.json()
  if(typeof response !== 'object') {
    throw new Error ('Response type is not an object.')
  }
  return response
}

// This code gets all drinks that start with an a from thecocktaildb.com
const getAllDrinks = async (): Promise<DrinksResponse> => {
  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')

  // This error is what comes if the server doesn't respond
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  // Since we always want an object, if the server responds with anything else, we get an error
  // This might be bad code, I am not sure
  const response = await res.json()
  if(typeof response !== 'object') {
    throw new Error ('Response type is not an object.')
  }
  return response
}

export const api = {
  getOrders,
  postOrder,
  putOrder,
  getRandomOrder,
  getAllDrinks,
}

