@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading clearfix">
                    <div class="pull-left">
                        <h3>
                            Your music
                        </h3>
                    </div>
                    <div class="pull-right">
                        <a href="#" class="js-upload-track btn btn-success">Upload</a>
                        @include('layouts.partial.modal', [
                            'id' => 'uploadModal',
                            'title' => 'Track upload' ])
                    </div>
                </div>

                <div class="panel-body">
                    @if ($tracks->count() !== 0)
                        @foreach ($tracks as $track)
                            <div>
                                {{ $track->original_filename }}
                            </div>
                        @endforeach
                    @else
                        <p>You have not tracks yet...</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
