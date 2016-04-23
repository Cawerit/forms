<pagelist>
    <span each={ pages }>
    <button onclick={ changePage.bind(this, number) } >{number}</button>
    </span>

    <script>
        this.pages = [];
        for(var i = this.opts.min; i <= this.opts.max; i++){
            this.pages.push({
                number: i
            });
        }

        changePage(number) {
            riot.route(location.pathname + '?page=' + number);
        }
    </script>
</pagelist>