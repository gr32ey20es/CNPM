import axios from 'axios';

const func = axios.create({
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  })
func.function$1 = async (data, setData) => {
    const response = await axios.get('http://localhost:4000/a', {
      params: {count: data[0]['count']},
    });
    setData([response["data"]]);
}

export default func;