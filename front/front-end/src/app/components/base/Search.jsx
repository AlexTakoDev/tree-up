import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Search = ({text, setOutput}) => {
	return (
		<div className="flex items-center border-gradient-v border-2 rounded-lg">
			<SearchIcon className="h-6 w-6 m-1 border-0 active:border-2 border-gradient-v rounded-lg" />
			<input className="w-full border-0 rounded-r-lg py-1" type="text" onChange={(e) => setOutput(e.target.value)}/>
		</div>
	);
};

export default Search;
