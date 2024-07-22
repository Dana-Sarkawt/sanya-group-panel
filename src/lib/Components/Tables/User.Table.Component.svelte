<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	
</script>


<div class="w-full h-auto bg-[#ffffff] dark:bg-[#081c18] p-4 rounded-b-xl">

    <Table striped={true}>
        <TableHead theadClass="bg-white dark:bg-[#212121] text-center">
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y text-center">
                    <TableBodyRow>
                        <TableBodyCell>12</TableBodyCell>
                        <TableBodyCell>df</TableBodyCell>
                        <TableBodyCell>yyuyu</TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>


                    <TableBodyRow>
                        <TableBodyCell>12</TableBodyCell>
                        <TableBodyCell>df</TableBodyCell>
                        <TableBodyCell>yyuyu</TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>


                    <TableBodyRow>
                        <TableBodyCell>12</TableBodyCell>
                        <TableBodyCell>df</TableBodyCell>
                        <TableBodyCell>yyuyu</TableBodyCell>
    
                        <TableBodyCell>
                            <div class="flex h-auto w-auto items-center justify-center gap-2">
                                

                                    <a href="edit/1" class="bg-green-600 hover:bg-green-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/edit.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                    
                                    <a href="edit/1" class="bg-red-600 hover:bg-red-500 h-12 w-12 p-2 flex justify-center items-center rounded-full">
                                        <img src="/images/delete.png" class="h-8 w-8 object-contain" alt="" />
                                    </a>
                                
                            </div>
                        </TableBodyCell>
                    </TableBodyRow>
        </TableBody>
    </Table>
</div>
