<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <div
    class="card bg-secondary bg-opacity-25 text-light border-secondary"
    style="max-width: 600px;"
  >
    <!-- Header -->
    <div class="card-header p-4">
      <h1 class="display-5">Chat Application</h1>

      <div class="input-group">
        <span class="input-group-text bg-dark text-light border-secondary">Name</span>
        <input
          type="text"
          class="form-control bg-dark text-light border-secondary"
          placeholder="enter your name and join.."
        />
        <button class="btn btn-outline-secondary" type="button">Join Chat</button>
      </div>
    </div>

    <!-- Body -->
    <div class="card-body p-4">
      <ul class="list-group h-100 overflow-auto">
        <li class="list-group-item bg-dark text-light p-3">
          <div class="d-flex align-items-start justify-content-start">
            <div class="d-flex flex-column my-1 me-3">
              <span class="badge bg-primary mb-1">user</span>
              <span class="badge text-muted text-nowrap">3:10 PM</span>
            </div>
            <span
              class="text-start"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ipsam?</span>
          </div>
        </li>

        <li class="list-group-item bg-dark text-light p-3">
          <div class="d-flex align-items-start justify-content-end">
            <span class="text-end">Lorem ipsum dolor sit amet.</span>
            <div class="d-flex flex-column my-1 ms-3">
              <span class="badge bg-primary mb-1">you</span>
              <span class="badge text-muted text-nowrap">3:15 PM</span>
            </div>
          </div>
        </li>

        <li class="list-group-item bg-dark text-light p-3">
          <div class="d-flex align-items-start justify-content-start">
            <div class="d-flex flex-column my-1 me-3">
              <span class="badge bg-primary mb-1">user</span>
              <span class="badge text-muted text-nowrap">4:00 PM</span>
            </div>
            <span class="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi totam amet modi aliquam aut,
              harum quidem necessitatibus laudantium magni sit.
            </span>
          </div>
        </li>

        <li class="list-group-item bg-dark text-light p-3">
          <div class="d-flex align-items-start justify-content-end">
            <span class="text-end ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Eius dolore sapiente laboriosam tempore facilis blanditiis,
              recusandae totam explicabo numquam voluptatem ullam laudantium tempora.
            </span>
            <div class="d-flex flex-column my-1 ms-3">
              <span class="badge bg-primary mb-1">you</span>
              <span class="badge text-muted text-nowrap">6:30 PM</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="card-footer p-4">
      <div class="input-group">
        <textarea
          class="form-control bg-dark text-light border-secondary p-3"
          placeholder="type your message and press send button.."
        ></textarea>
        <button class="btn btn-outline-secondary" type="button">Send</button>
      </div>
    </div>
  </div>
</template>

