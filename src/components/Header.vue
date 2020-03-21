<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Stock Trader</router-link>

        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <router-link tag="li" class="nav-item" to="/portfolio" activeClass="active"><a class="nav-link">Portfolio</a></router-link>
                <router-link tag="li" class="nav-item" to="/stocks" activeClass="active"><a class="nav-link">Stocks</a></router-link>
            </ul>
            <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
            <ul class="navbar-nav navbar-right">
                <li class="nav-item"><a class="nav-link" style="cursor: pointer" @click.prevent="endDay">End Day</a></li>
                <li class="nav-item dropdown" :class="{show: isDropdownOpen}" @click="isDropdownOpen = !isDropdownOpen">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                    >Save & Load</a>
                    <div class="dropdown-menu" :class="{show: isDropdownOpen}">
                        <a class="dropdown-item" style="cursor: pointer" @click.prevent="saveData">Save Data</a>
                        <a class="dropdown-item" style="cursor: pointer" @click.prevent="loadData">Load Data</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            isDropdownOpen: false,
        };
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
    },
    methods: {
        ...mapActions({
            randomizeStocks: 'randomizeStocks',
            fetchData: 'loadData',
        }),
        endDay() {
            this.randomizeStocks();
        },
        saveData() {
            const data = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks,
            };
            this.$http.put('data.json', data);
        },
        loadData() {
            this.fetchData();
        },
    },
}
</script>
