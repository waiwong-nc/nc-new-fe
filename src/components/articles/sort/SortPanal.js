import './sort.scss';

const SortPanal = () => {

    function sumbitHandler(e){
        e.preventDefault()
        console.log(e.target.value);

    }

    return (
      <div className="sort_panal">
        <form onSubmit={sumbitHandler}>
          <select name="sort_by">
            <option value="date">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Vote no</option>
          </select>

          <select name="order_by">
            <option value="des">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>

          <button type="submit"> submit</button>
        </form>
      </div>
    );
};

export default SortPanal;