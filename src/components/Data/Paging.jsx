import { Menu, Icon, Input, Button } from "semantic-ui-react";

const Paging = ({ pageNumbers, currentPage, setPage, setCurrentPage }) => {
  return (
    <>
      <Menu floated='right' pagination>
        <Menu.Item
          as='a'
          icon
          onClick={() => {
            setPage(currentPage - 1);
          }}
        >
          <Icon name='chevron left' />
        </Menu.Item>
        {pageNumbers !== null
          ? pageNumbers.map((num) => {
              return (
                <Menu.Item
                  as='a'
                  onClick={() => {
                    setPage(num);
                  }}
                >
                  {num}
                </Menu.Item>
              );
            })
          : null}
        <Menu.Item
          as='a'
          icon
          onClick={() => {
            setPage(currentPage + 1);
          }}
        >
          <Icon name='chevron right' />
        </Menu.Item>
      </Menu>
      <Input
        placeholder='Page'
        value={currentPage}
        onChange={(event) => {
          setCurrentPage(event.target.value);
        }}
      />
      <Button
        color='blue'
        onClick={() => {
          setPage(currentPage);
        }}
      >
        Go To Page
      </Button>
    </>
  );
};

export default Paging;
