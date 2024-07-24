<script lang="ts">
    import DeleteModal from '$lib/Components/DeleteModal.Component.svelte';

    let deleteModal = false;
	
</script>




<div class="w-full h-auto flex justify-center items-center mx-2">

    <table class="table w-full text-white text-[5px] md:text-lg rounded-xl">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Payed or financial dues</td>
          <td>100000</td>
          <td>22/01/2024</td>
          <td>
  
            <div class="flex h-auto w-auto items-center justify-center gap-2">
              <a
                href="edit/1"
                class="bg-green-600 hover:bg-green-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full"
              >
                <img
                  src="/images/edit.png"
                  class="w-4 h-4 md:h-8 md:w-8 object-contain"
                  alt=""
                />
              </a>
              <!-- svelte-ignore a11y-missing-attribute -->
              <a
                class="bg-red-600 hover:bg-red-500 w-6 h-6 md:h-12 md:w-12 p-2 flex justify-center items-center rounded-full" 
              >
                <img
                  src="/images/delete.png"
                  class="w-4 h-4 md:h-8 md:w-8 object-contain"
                  alt=""
                />
              </a>
            </div>
  
  
          </td>
        </tr>
       
      </tbody>
    </table>
  
  </div>



  <DeleteModal bind:deleteModal />