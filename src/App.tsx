import { useEffect, useRef } from 'react';
import { signal, useComputed } from '@preact/signals-react';
import './App.css'
import Content from './content/index.mdx';
import { MDXProvider } from '@mdx-js/react';

function App() {
  const pageCount = useRef(signal(100)).current;

  // useEffect(() => {
  //   const regionoversetchange = (event: any) => {
  //     let overflow = event.target.firstEmptyRegionIndex === -1;
  //     console.log('overflow', overflow, event.target.firstEmptyRegionIndex, pageCount.value);
  //     if (overflow) {
  //       pageCount.value++;
  //     } else if (event.target.firstEmptyRegionIndex > 0) {
  //       pageCount.value = event.target.firstEmptyRegionIndex;
  //     }
  //   }
  //   document.getNamedFlow('page-flow').addEventListener('regionoversetchange', regionoversetchange);
  //   return () => {
  //     document.getNamedFlow('page-flow').removeEventListener('regionoversetchange', regionoversetchange);
  //   }
  // }, []);



  let pages = useRef(useComputed(() => {
    return Array.from({ length: pageCount.value }).map((_, i) => (
      <div key={i} className='page'>
        <div className='page-header-container'>
          <div className='page-header' />
        </div>
        <div className='page-content-container'>
          <div className='page-content' />
        </div>
        <div className='page-footer-container'>
          <div className='page-footer'>
            <div className='page-number'>{i + 1}</div>
          </div>
        </div>
      </div>
    ));
  })).current;

  // pages.subscribe(() => {
  //   // Trigger relayout when pages change
  //   document.getNamedFlow('page-flow').relayout();
  //   console.log(pages.value.length, 'pages');
  // });

  return (
    <>
      <div className='app'>
        <div className='page-area a4'>
          {pages}
        </div>
        <div className='content'>
          <MDXProvider components={{ NewPage, TableOfContent }}>
            <Content />
          </MDXProvider>
        </div>
      </div>
    </>
  )
}

const NewPage: React.FC = () => {
  return <div className='newpage' />;
}

const TableOfContent: React.FC = () => {
  return (
    <div className='table-of-contents'>
      <ol>
        <li><div><span className='title'>Einleitung</span> <span className='spacer'></span> <span className='page-number'>1</span></div></li>
        <li><div><span className='title'>Danksagung</span> <span className='spacer'></span> <span className='page-number'>2</span></div></li>
        <li><div><span className='title'>Lorem Ipsum</span> <span className='spacer'></span> <span className='page-number'>3</span></div></li>
      </ol>
    </div>
  );
};

export default App;
