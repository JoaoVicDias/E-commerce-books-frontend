import styled from "styled-components";

export const Container = styled.div`
  .paginate_container {
    margin-top: 40px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .paginate_li {
    background-color: #3273dc;
    padding: 8px;
    color: #fff;
    border-radius: 4px;
  }

  .disabled,
  .paginate_li_active {
    opacity: 0.8;
  }

  .paginate_previous {
    padding: 8px;
  }

`;
