<pagelist>
    <div class="wrapper">
        <span each={ pages }>
            <button onclick={ changePage.bind(this, number) } >{number}</button>
        </span>
    </div>

    <script>
        this.pages = [];
        var i = this.opts.min || 1,
            n = this.opts.max || 1;
        while(i <= n){
            this.pages.push({
                number: i
            });
            i++;
        }

        changePage(number) {
            riot.route(location.pathname + '?page=' + number);
        }
    </script>

    <style>
        .wrapper {
            margin: 2em;
        }
    </style>
</pagelist>