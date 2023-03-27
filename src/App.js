// 使用hook
import { useState, useEffect } from 'react'

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  // 参数[value,setValue],参数传入一个初始值
  const [ searchField, setSearchField ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ monsters, setMonsters ] = useState([]);
  // 为避免继续渲染过滤后的数组，新设置一个state值来存储过滤后的数组
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);

  // 参数一：回调函数，参数二：依赖数组，如果里面值改变，则会调用回调函数。传入空数组，该方法就执行一次。
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((users) => {
      setMonsters(users)
    });
  }, [])

  // 当搜索框值或者数组（及第二个参数）改变时，过滤后数组才改变。
  useEffect(() => {
    const newFilterMonsters = monsters.filter(i => {
      return i.name.toLocaleLowerCase().includes(searchField)
    })

    setFilteredMonsters(newFilterMonsters)
  }, [ monsters, searchField ])

  // 输入框过滤后值设置给state
  const onSearchChange = (event) => {
    const searchFiledString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFiledString)
  }
  // 输入框过滤后值设置给state
  const onTitleChange = (event) => {
    const searchFiledString = event.target.value.toLocaleLowerCase();
    setTitle(searchFiledString)
  }

  return (
    <div className="App">
      <h1 className='app-title'>{ title }</h1>
      <SearchBox onSearchChange={ onSearchChange } placeholder={ 'search Monsters' } className={'searchBox'}/>
      <br />
      <SearchBox onSearchChange={ onTitleChange } placeholder={ 'search Title' } className={'searchBox'}/>
      <CardList monsters={ filteredMonsters } />
    </div>
  )
}

export default App;
