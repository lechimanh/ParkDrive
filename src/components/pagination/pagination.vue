<template>
    <nav>
      <ul class="pagination">
        <li v-if="currentPage > 1">
          <a @click="currentPage--">«</a>
        </li>
        <li v-for="(n, index) in pages" :key="index" :class="{active: n === currentPage}">
          <a v-if="n !== '...'" @click="currentPage = n">{{ n }}</a>
          <span v-else>...</span>
        </li>
        <li v-if="currentPage < totalPages">
          <a @click="currentPage++">»</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    computed: {
  pages() {
    const arr = [];
    if (this.totalPages <= 10) {
      for (let i = 1; i <= this.totalPages; i++) {
        arr.push(i);
      }
    } else {
      if (this.currentPage <= 6) {
        for (let i = 1; i <= 7; i++) {
          arr.push(i);
        }
        arr.push('...');
        arr.push(this.totalPages - 1);
        arr.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 5) {
        arr.push(1);
        arr.push(2);
        arr.push('...');
        for (let i = this.totalPages - 6; i <= this.totalPages; i++) {
          arr.push(i);
        }
      } else {
        arr.push(1);
        arr.push(2);
        arr.push('...');
        arr.push(this.currentPage - 1);
        arr.push(this.currentPage);
        arr.push(this.currentPage + 1);
        arr.push('...');
        arr.push(this.totalPages - 1);
        arr.push(this.totalPages);
      }
    }
    return arr;
  }
},
watch: {
    currentPage() {
      this.$emit('page-changed', this.currentPage);
    }
  }

  }
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }
  
  .pagination li {
    margin: 0 5px;
  }
  
  .pagination a,
  .pagination span {
    display: block;
    padding: 5px 10px;
    border: 1px solid #ccc;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
  
  .pagination a:hover,
  .pagination a.active,
  .pagination li.active {
    background-color: #1A3175;
    color: #fff;
  }
  .pagination li.active a{
    color: #fff;
  }
  </style>
  