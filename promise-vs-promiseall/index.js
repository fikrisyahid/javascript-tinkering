const getTodos = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDuration = async (message, fn) => {
  const startTime = new Date().getTime();
  await fn();
  const endTime = new Date().getTime();
  const duration = (endTime - startTime) / 1000;
  console.log(`${message}: ${duration} s`);
};

const promiseNormal = async (amountFetch, url) => {
  try {
    for (let i = 0; i < amountFetch; i++) {
      await getTodos(url);
    }
  } catch (error) {
    console.log(error);
  }
};

const promiseAll = async (amountFetch, url) => {
  try {
    const toFetch = Array(amountFetch).fill(getTodos(url));
    await Promise.all(toFetch);
  } catch (error) {
    console.log(error);
  }
};

// Start
const amountFetch = 100;
const url = `https://jsonplaceholder.typicode.com/todos`;
getDuration("Promise Normal", () => promiseNormal(amountFetch, url));
getDuration("Promise All", () => promiseAll(amountFetch, url));
