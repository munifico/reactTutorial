import React from 'react';

const useSemiPersistentSate = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem('value') || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = () => {

  const stories = [
    {
      title: 'React',
      url : 'https:/reactjs.org',
      author: 'Jordan Wlke',
      num_comments:3,
      points:4,
      objectId:0,
    },
    {
      title : 'Redux',
      url : 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points : 5,
      objectId:1,
    }
  ]

  const [searchTerm, setSearchTerm] = useSemiPersistentSate('Search', 'React');

  // A
  const handleSearch = event => {
    // C
    //console.log(event.target.value);
    setSearchTerm(event.target.value);
  }
  
  

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
        
      {/* <Search Search={searchTerm} onSearch={handleSearch} /> 
      <InputWithLabel id="Search" label="Search" value={searchTerm} onInputChange={handleSearch} />
      */}
      <InputWithLabel id="Search" value={searchTerm} onInputChange={handleSearch} >
        <strong>Search : </strong> 
        </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </div>
  )
};

const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

/*
const Search = ({Search, onSearch}) => (
  <>
  <label key="1" htmlFor="Search">
    Search:{''}
  </label>
  <input id="Search" type="text" value={Search} onChange={onSearch} />   
  </> 
);
*/


const List = ({list}) => 
  list.map(item => <Item key={item.objectId} item={item} />);


const Item = ({item}) => (
      <div>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
  );

export default App;
