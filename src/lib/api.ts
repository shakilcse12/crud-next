import axios from 'axios';

const API_BASE = 'https://crud.teamrabbil.com/api/v1';
export const getProducts = async () => {
    //const API_BASE = 'https://crud.teamrabbil.com/api/v1';
  
    try {
      const response = await fetch(`${API_BASE}/ReadProduct`);
      const data = await response.json();
      
      //console.log('API Response:', data); // Log the response to inspect the structure
      
      if (Array.isArray(data.data)) {
        return data.data; // Return data if it's an array
      } else {
        console.error('Unexpected API response format:', data);
        return []; // Fallback to an empty array
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Fallback to an empty array in case of error
    }
  };
// export const getProducts = async () => {
//     // Mock response for development
//     return [
//       {
//         _id: '1',
//         ProductName: 'Test Product',
//         UnitPrice: 10,
//         Qty: 5,
//         TotalPrice: 50,
//         ProductCode: 'P001',
//         Img: 'https://via.placeholder.com/150',
//       },
//     ];
//   };
  

export const createProduct = async (data: any) => {
  const response = await axios.post(`${API_BASE}/CreateProduct`, data);
  return response.data;
};

export const updateProduct = async (id: string, data: any) => {
  const response = await axios.post(`${API_BASE}/UpdateProduct/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  console.log("the delete func is gettign called");
  const response = await axios.get(`${API_BASE}/DeleteProduct/${id}`);
  console.log(response.data);
  return response.data;
};
