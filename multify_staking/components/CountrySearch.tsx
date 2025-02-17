import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import search_icon from "../public/assets/images/search_icon.svg";
import Image from "next/legacy/image";
import { countries } from "../models/country";
import { useAuth } from "../context/authcontext";

// Country Search
export default function CountrySearch() {
  const [selected, setSelected] = useState<any[]>([]);
  const { data, setFormValues } = useAuth();


  useEffect(() => {
    // compare selected and data.restrictedCountries.name if not similar updated selected
    if (data?.restrictedCountries?.length !== selected?.length) {
      setSelected(data?.restrictedCountries);
    }
  }, [data?.restrictedCountries])

  // setFormValues when selected got changed
  useEffect(() => {
    if (selected?.length > 0)
      setFormValues({ restrictedCountries: selected });
  }, [selected])

  return (
    <div className="relative rounded-md shadow-sm ">
      <div className="w-full text-black leading-[20px]  border-[1.5px] border-jade-100 rounded-full bg-white placeholder:text-black">
        <div className="absolute top-[10px] left-[15px]">
          <Image className="text-black border-jade-100 bg-teal-900 " src={search_icon} alt="search_icon" layout="intrinsic" />
        </div>
        <Select
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "transparent",
            boxShadow: "none",
            borderRadius: "0",
            textAlign: "left",
            padding: "0 0 0 52px",
          }}
          options={countries}
          placeholder="Select Restricted Countries"
          labelField="name"
          valueField="name"
          onChange={(values) => setSelected(values)}
          searchBy={"name"}
          keepSelectedInList={true}
          clearOnBlur={false}
          clearOnSelect={false}
          dropdownGap={4}
          multi={true}
          values={selected}
        />
      </div>
    </div>
  );
}
