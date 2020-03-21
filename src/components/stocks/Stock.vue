<template>
    <div class="col-sm-6 col-md-4">
        <div class="card mb-3">
            <div class="card-header bg-success text-dark">
                <h5 class="card-title mb-0">{{ stock.name }} <small>(Price: {{ stock.price }})</small></h5>
            </div>
            <div class="card-body">
                <div class="input-group">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{'is-invalid': insufficientFunds}" />
                    <div class="input-group-append">
                        <button class="btn btn-success" @click="buyStock" :disabled="disabled">Buy</button>
                    </div>
                </div>
                <small v-if="insufficientFunds" class="text-danger">Insufficint Funds</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["stock"],
    data() {
        return {
            quantity: 0,
        };
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
        insufficientFunds() {
            return this.funds < this.quantity * this.stock.price;
        },
        insufficientQuantity() {
            return this.quantity <= 0;
        },
        disabled() {
            return this.insufficientQuantity || !Number.isInteger(+this.quantity) || this.insufficientFunds;
        },
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity,
            };

            this.$store.dispatch('buyStock', order);
            this.quantity = 0;
        },
    },
}
</script>
