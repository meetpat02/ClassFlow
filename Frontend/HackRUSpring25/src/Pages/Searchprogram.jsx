import './Searchprogram.css';


export function Searchprogram() {
    return (
        <>
        <div className="main">
            <div className="header">
            <div >
                <h1>Search Course</h1>
            </div>
            <div className="search">
                <div className="eachsearch">
                <h2>Search Code: </h2>
                <input type="text" id="search"  />
                </div>
                <div className="eachsearch">
                <h2>Subject Name: </h2>
                <input type="text" id="search"  />
                </div>
                <button>Search</button>
                
            </div>
            </div>
        </div>
        </>
    )
}