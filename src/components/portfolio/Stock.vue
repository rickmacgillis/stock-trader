<template>
    <div class="col-sm-6 col-md-4">
        <div class="card mb-3">
            <div class="card-header bg-info">
                <h5 class="card-title mb-0">{{ stock.name }} <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small></h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-xs-8 pl-3">
                        <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" />
                    </div>
                    <div class="col-xs-3 offset-sm-1">
                        <button class="btn btn-success" @click="sellStock" :disabled="quantity <= 0 || !Number.isInteger(+quantity)">Sell</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ["stock"],
    data() {
        return {
            quantity: 0,
        };
    },
    methods: {
        ...mapActions({
            storeSellStock: 'sellStock',
        }),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity,
            };
            this.storeSellStock(order);
            this.quantity = 0;
        },
    },
}
</script>
