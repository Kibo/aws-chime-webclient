<template>
	<div class="row mt-4">
		<div class="col-12 col-sm-12 col-md-6 offset-md-3">
			
			<div class="card ">
				<div class="card-header">Join the meeting</div>	
				<div class="card-body">				
					<form id="form-login">								
						<div class="form-group">						
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></div>
								</div>
								<input type="text" class="form-control" name="name" placeholder="Your name during the meeting." maxlength="100" autocomplete="off" required>
							</div>																							
						</div>
						<div class="form-group">
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-lock" aria-hidden="true"></i></div>
								</div>
								<input type="text" class="form-control" name="pin" placeholder="PIN to join the meeting." maxlength="100" autocomplete="off" required>
							</div>																																		
						</div>
						
						<div>
							<button name="btn-join" class="btn btn-block btn-success">Join</button>						
						</div>															
					</form>
				</div>
			</div>
						
		</div>
	</div>
</template>

<script>
//import TodoItem from "./TodoItem.vue"

let nextTodoId = 1

const createTodo = text => ({
  text,
  id: nextTodoId++
})

export default {
  components: {
    
  },

  data() {
    return {
      todos: [
        createTodo("Learn Vue"),
        createTodo("Learn about single-file components"),
        createTodo("Fall in love ❤️")
      ],

      newTodoText: ""
    }
  },

  methods: {
    addTodo() {     
    },

    removeTodo(item) {      
    }
  }
}
</script>

<style lang="stylus">

</style>
