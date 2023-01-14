const PageNotFound = () => {

    const styles = {
        container: {
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'colunm',
            justifyContent:'center',
            // alignItems:'center'
        },
        title:{
            marginTop:'300px'
        }
    }

    return (
      <div className="page_not_found" style={styles.container}>
        <h1  style={styles.title}>404 Not Found</h1>
      </div>
    );
}

export default PageNotFound;