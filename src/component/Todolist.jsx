import styled from "styled-components";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const Maincontainer = styled.main`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Boxcontainer = styled.div`
  width: 590px;
  height: 500px;
  border: 2px solid black;
`;

const Title = styled.header`
  height: 20px;
  padding: 25px;
  border: 1px solid black;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: whitesmoke;
  background-color: #111;
`;

const Boxcontainer2 = styled.div`
  display: flex;
  height: 70px;
  border: 1px solid black;
  align-items: center;
`;

const Input = styled.input`
  width: 84%;
  height: 42px;
  margin: 5px;
  padding: 10px;
  border: none;
  :focus {
    outline: none;
  }
  font-size: 20px;
`;

const Addcontainer = styled.button`
  width: 10%;
  height: 57px;
  border-radius: 100%;
  font-size: 2.5rem;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
`;

const Deletecontainer = styled.button`
  width: 59px;
  height: 59px;
  border-radius: 100%;
  font-size: 2.5rem;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
  margin-left: 20px;
  margin-right: 20px;
`;

const Watch = styled.div`
  font-size: 1.6rem;
  height: 60px;
  text-align: center;
  > h1 {
    font-size: 1.6rem;
  }
`;

const Changed = styled.button`
  font-size: 1.6rem;
  width: 70px;
  height: 50px;
  background-color: white;
  border: none;
  margin-left: 20px;
  cursor: pointer;
`;

const Inputcontent = styled.input``;

export const Todolist = () => {
  const [times, setTimes] = useState(null);
  const [title, setTitle] = useState();
  const [changes, setChanges] = useState(true);
  const [changesTo, setChangesTo] = useState(null);

  const eventHandle = (event) => {
    setTitle(event.target.value);
  };

  const changeHandler = () => {
    console.log(changes);
    setChanges(!changes);
  };

  const serverHandle = () => {
    fetch("http://localhost:3000/homework", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };
  const deleteHandle = (id) => {
    fetch("http://localhost:3000/homework/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        window.location.reload();
      });
  };

  const changeHandle = (e, id) => {
    console.log(e.target.value);
    console.log(title);
    e.preventDefault();
    fetch("http://localhost:3000/homework/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        homework: changesTo,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetch("http://localhost:3000/homework")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTimes(data);
        console.log(times);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Maincontainer>
      <Boxcontainer>
        <Title>오늘의 할일</Title>
        <Boxcontainer2>
          <Input
            placeholder="할 일을 적어주세요."
            value={title}
            onChange={(event) => eventHandle(event)}
          ></Input>
          <Addcontainer onClick={serverHandle}>+</Addcontainer>
        </Boxcontainer2>
        {times &&
          times.map((a) => (
            <Watch>
              {changes ? <h1>{a.title}</h1> : null}
              {changes ? (
                <Changed onClick={changeHandler}>✏</Changed>
              ) : (
                <Inputcontent
                  value={changesTo}
                  onChange={(e) => {
                    setChangesTo(e.target.value);
                  }}
                ></Inputcontent>
              )}
              {changes ? null : (
                <Changed onClick={(e) => changeHandler(e, a.id)}>✏</Changed>
              )}
              <Deletecontainer onClick={() => deleteHandle(a.id)}>
                -
              </Deletecontainer>
            </Watch>
          ))}
      </Boxcontainer>
    </Maincontainer>
  );
};
