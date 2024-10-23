


// import { useEffect, useState } from 'react';
// import SimpleTodos from './components/SimpleTodos';
// import './App.css';

// const url = "http://localhost:8080/bg";

// function App() {
//     const [temp, setTemp] = useState([]);

//     useEffect(() => {
//         const fetchBackgrounds = async () => {
//             try {
//                 let response = await fetch(url);
//                 let data = await response.json();
//                 setTemp(data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchBackgrounds();
//     }, []);

//     return (
//         <div>
//             <SimpleTodos/>
//             <h1>Backgrounds List</h1>
//             {temp.length > 0 ? (
//                 temp.map((background) => (
//                     <div key={background.id}>
//                         <p>Name: {background.name}</p>
//                         <p>Description: {background.description}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// export default App;




// import { useEffect, useState } from 'react';
// import SimpleTodos from './components/SimpleTodos';
// import './App.css';

// const url = "http://localhost:8080/bg";

// function App() {
//     const [temp, setTemp] = useState(null);

//     useEffect(() => {
//         const fetchBackgrounds = async () => {
//             try {
//                 const response = await fetch(url);
//                 const data = await response.json();
//                 setTemp(data);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchBackgrounds();
//     }, []);

//     return (
//         <div>
//             <SimpleTodos />
//             <h1 className='editHead'>Backgrounds List</h1>
//             {temp ? (
//                 temp.length > 0 ? (
//                     temp.map((background) => (
//                         <div key={background.id} className='editChanges'>
//                             <pre>Name: {background.name} </pre>
//                             <pre>-- Age: {background.age} </pre>
//                             <pre> -- DataTime: {background.dataTime}</pre>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No backgrounds found.</p>
//                 )
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// export default App;






import { useEffect, useState } from 'react';
import SimpleTodos from './components/SimpleTodos';
import './App.css';

const url = "http://localhost:8080/bg";

function App() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTemp(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBackgrounds();
  }, []);

  const submitNew = async (todoName) => {
    const newTodo = {
        name: todoName,
        age: 0,
        dataTime: new Date().toLocaleString(),
    }
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        setTemp((prevTodo) => [...prevTodo, data]);
        console.log("Todo added successfully:", data);
    } catch (error) {
        console.error("Error adding todo:", error);
    };
}



  return (
    <div>
    <SimpleTodos onAddTodo={submitNew} />
      <h1 className='editHead'>Backgrounds List</h1>
      {temp ? (
        temp.length > 0 ? (
          temp.map((background) => (
            <div key={background.id} className='editChanges'>
              <pre>Name: {background.name}</pre>
              <pre>-- Age: {background.age}</pre>
              <pre>-- DateTime: {background.dataTime}</pre>
            </div>
          ))
        ) : (
          <p>No backgrounds found.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;



