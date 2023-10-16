const fetchSpecific = () => {
  return (
    <div className="specific text-white">
      <h2>hei prøv nå</h2>
    </div>
  );
};

export default fetchSpecific;

/*export default function PostPage() {
  const [post, setPost] = useState(initialPostState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TIP: Get the ID from the search params in the URL
        // TIP: Fetch the post from the API using the ID
        // TIP: Set the post in state
      } catch (error) {
        // TIP: Handle errors from the API
      } finally {
        // TIP: Set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>A single post</h1>
      <section>
        <h2>{post?.title}</h2>
      </section>
    </>
  );
}
*/
