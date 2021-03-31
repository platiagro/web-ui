// REACT LIBS
import React from 'react';

// STYLES
import './styles.less';

/**
 * My projects empty placeholder.
 *
 * @returns {MyProjectsEmptyPlaceholder} Component
 * @component
 * @example
 * return <MyProjectsEmptyPlaceholder />;
 */
const MyProjectsEmptyPlaceholder = () => {
  // rendering component
  return (
    <div className='myProjectsEmptyPlaceholderContainer'>
      <div className='myProjectsEmptyPlaceholder'>
        <h3>Você ainda não tem projetos</h3>
        <p>
          Clique no botão <strong>Novo Projeto</strong> para começar
        </p>
      </div>
    </div>
  );
};

// EXPORT DEFAULT
export default MyProjectsEmptyPlaceholder;
