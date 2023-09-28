"use client";
import Image from "next/image";
import { Card } from "@components/Card";
import { useEffect, useRef, useState } from "react";
import { db } from "@/utils/db";

export default function Home() {
  //const [cards, setCards] = useState([1, 2, 3, 5, 8, 13, 21, 34]);
  const cards = useRef([1, 2, 3, 5, 8, 13, 21, 34]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState(0);

  const handleIsSelected = (value: number) => {
    setSelectedCard(value);
    sessionStorage.setItem("selectedCard", value.toString());
  };

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  async function createUser(name:string) {
    const newUser = await db.user.create({
      data: {
        name,
        imageUrl: "https://cdn.fakercloud.com/avatars/nelshd_128.jpg",
      },
    });
    sessionStorage.setItem("userName", newUser.name);
  }

  async function getUser(name: string) {
    const user = await db.user.findFirst({
      where: {
        name,
      },
    });
    user && sessionStorage.setItem("userName", user.name);
  }

  useEffect(() => {
    // const user = sessionStorage.getItem("userName");
    // if (user) {
    //   //getUser(user);
    // } else {
    console.log("create user");

    //createUser();
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 bg-slate-400 ">
        <h1>Planning poker {selectedCard}</h1>
        <button
          className="box-border rounded-md py-1 px-2 my-2 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-emerald-300 text-white"
          onClick={() => {
            modalRef.current?.classList.remove("hidden");
            modalRef.current?.classList.add("block");
          }}
        >
          Enter
        </button>
        <section className="flex gap-1">
          {cards.current.map((card, index) => (
            <Card
              key={index}
              value={card}
              handleIsSelected={handleIsSelected}
              isSelect={selectedCard === card}
            />
          ))}
        </section>
      </main>

      <div
        id="modal-screen"
        ref={modalRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          modalRef.current?.classList.remove("block");
          modalRef.current?.classList.add("hidden");
        }}
        className="transition-all ease-in duration-75 w-screen h-screen hidden absolute top-0 left-0 backdrop-blur-sm z-10 bg-black bg-opacity-50"
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          id="modal-component"
          className="p-4 absolute top-1/4 left-1/3 w-1/3 h-auto bg-white z-50 rounded-lg shadow-2xl text-black border-4 box-border border-grey-200"
        >
          <svg
            className="absolute top-3 right-3 cursor-pointer"
            onClick={(e) => {
              modalRef.current?.classList.remove("block");
              modalRef.current?.classList.add("hidden");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            fill="none"
            viewBox="0 0 24 24"
          >
            <g stroke="#1C274C" strokeWidth={1.5}>
              <circle cx={12} cy={12} r={10} opacity={0.5} />
              <path strokeLinecap="round" d="m14.5 9.5-5 5m0-5 5 5" />
            </g>
          </svg>
          <h3 className="text-center">Add your name </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="min-w-full mt-4">
              <input
                className="bg-slate-100 min-w-full rounded-md box-border px-1 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-900"
                type="text"
                name="name"
                id="name"
              />
            </div>

            <button
              onClick={(e) => {
                modalRef.current?.classList.remove("block");
                modalRef.current?.classList.add("hidden");
              }}
              className="self-end box-border rounded-md py-1 px-2 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-emerald-300 text-white"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
