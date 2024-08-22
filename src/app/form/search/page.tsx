"use client"

import FilmPreview from "@/components/FilmPreview";
import { searchFilmAction } from "@/data/actions/search-film";
import { useFormState, useFormStatus } from "react-dom";


const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-80"
    >
      Submit
    </button>
  );
}

const Page = () => {
  const [state, formAction] = useFormState(searchFilmAction, null);
  
  return (
    <section className="bg-white inline-block mt-10">

        {
          state ? (
            <div>
              <FilmPreview data={state.data}/>
            </div>
          ) : (
            // max-w-md mx-auto bg-white p-10
            <form
              className="max-w-md mx-auto bg-white p-10"
              action={formAction}
            >
              <div className="relative z-0 w-full mb-5 group">
                  <input type="text" name="film_name" id="film_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="film_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Film name</label>
              </div>

              <SubmitButton />
            </form>   
          )
        }
    </section>
  );
}



export default Page;
