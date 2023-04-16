import type { NextPage } from "next";
import Head from "next/head";
import { XataClient } from "../util/xata";

type Props = Awaited<ReturnType<typeof getServerSideProps>>["props"];

const Index: NextPage<Props> = ({ todos }) => {
  return (
    <main>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" />
      </Head>
      <h1>My todo list</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label>
              <input type="checkbox" />
              {t.label}
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Index;

const xata = new XataClient();

export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany();

  return {
    props: { todos },
  };
};
