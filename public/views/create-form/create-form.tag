<create-form>

    <edit-form promise={getPromise()}></edit-form>

    <script>
        getPromise(){
            return new Promise(function(resolve){
               resolve('keh keh');
            });
        }
    </script>

</create-form>