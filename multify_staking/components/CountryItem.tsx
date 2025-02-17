import React from 'react'
import { useAuth } from '../context/authcontext';

export default function CountryItem(title : any) {
    const { data, setFormValues } = useAuth();

    // remove title from restricted countries on click
    const removeCountry = (title : any) => {
        const newCountries = data?.restrictedCountries?.filter((country : any) => country.name !== title.title);
        setFormValues({restrictedCountries : newCountries});
    }

    return (
        <>
            {/* COUNTRY ITEM */}
            <div className="flex items-center justify-between">
                {/* NAME */}
                <h3 className=" text-base leading-5">{title?.title}</h3>
                {/* BUTTON */}
                <button 
                onClick={() => removeCountry(title)}
                className="text-red text-base leading-5 underline underline-offset-2 decoration-1">
                    Remove
                </button>
            </div>
        </>
    )
}
